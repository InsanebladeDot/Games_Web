/*
请修改文件 src/app/(root)/articles/page.tsx
*/
"use client";
import React, { useState, useEffect } from 'react';
// 导入独立的模态框组件，确保路径正确
import PublishContentModal from '@/components/common/PublishContentModallprops';
// 导入图片预览模态框组件
import ImagePreviewModal from '@/components/common/ImagePreviewModal';
import { t, getCurrentLang } from '@/components/i18n';
import { getUserExperienceList } from '@/app/api/user_experience/index';
import { useGameExperienceStore } from '@/store/gameExperienceStore';
import Image from 'next/image';

export default function Articles() {
    // 使用 Zustand store 中的数据
    const { experiences, setExperiences } = useGameExperienceStore();
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false); // 控制发布模态框显示状态
    const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false); // 控制图片预览模态框显示状态
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null); // 存储要预览的图片 URL
    const [currentLang, setCurrentLang] = useState<'zh' | 'en'>('zh'); // 当前语言

    // 添加一个状态来指示组件是否已经挂载到客户端
    const [mounted, setMounted] = useState(false);
    // 添加单独的状态用于UI更新，不影响数据显示
    const [uiRefresh, setUiRefresh] = useState(0);

    // 在组件挂载后设置 mounted 为 true 并获取当前语言
    useEffect(() => {
        setMounted(true);
        const lang = getCurrentLang();
        setCurrentLang(lang);
        console.log(`Articles component mounted, current language: ${lang}`);
    }, []); // 空依赖数组确保只在挂载时执行一次

    // 拉取数据并更新 store
    useEffect(() => {
        getUserExperienceList().then(res => {
            const data = res.data.data || [];
            setExperiences(data);
        });
    }, [setExperiences]);

    // 监听语言变化事件
    useEffect(() => {
        const handler = () => {
            // 当语言变化时，更新当前语言状态
            const newLang = getCurrentLang();
            setCurrentLang(newLang);
            console.log(`Language change detected in Articles component: ${newLang}`);
            // 使用单独的状态来刷新UI，不影响数据显示
            setUiRefresh(prev => prev + 1);
        };
        // 订阅语言变化事件
        window.addEventListener("langchange", handler);
        // 清理函数：组件卸载时移除事件监听器
        return () => {
            window.removeEventListener("langchange", handler);
        };
    }, []); // 空依赖数组表示只在组件挂载和卸载时运行

    const handlePublishClick = () => {
        setIsPublishModalOpen(true); // 点击按钮时打开发布模态框
    };

    const handleClosePublishModal = () => {
        setIsPublishModalOpen(false); // 关闭发布模态框
    };

    // 处理图片点击，打开图片预览模态框
    const handleImageClick = (imageUrl: string) => {
        setPreviewImageUrl(imageUrl); // 设置要预览的图片 URL
        setIsImagePreviewOpen(true); // 打开图片预览模态框
    };

    
    // 处理关闭图片预览模态框
    const handleCloseImagePreview = () => {
        setIsImagePreviewOpen(false); // 关闭图片预览模态框
        setPreviewImageUrl(null); // 清空预览图片 URL
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 pb-20 overflow-hidden">
            {/* 当前语言显示（调试用，可以在生产环境中移除） */}
            <div className="fixed top-20 left-8 text-xs text-gray-500">
                {mounted ? t('articles.currentLanguage') : ''}: {t('header.currentLanguage')}({mounted ? t('articles.uiRefreshCount') : ''}: {uiRefresh})
            </div>
            
            {/* 主标题H1 - 使用艺术字设计 */}
            <header className="w-full max-w-screen-xl mx-auto mb-10 text-center" key={`header-${uiRefresh}`}>
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    {mounted ? t('articles.title') : ''}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    {mounted ? t('articles.subtitle') : ''}
                </p>
            </header>

            {/* 简介部分 - H2标题 */}
            <section className="w-full max-w-screen-xl mx-auto mb-12 px-4" key={`about-${uiRefresh}`} id="about-section">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-400 border-b-2 border-green-500 pb-2 inline-block mx-auto">
                    {mounted ? t('articles.aboutSection') : ''}
                </h2>
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                    <p className="text-lg text-gray-300 mb-4">
                        {mounted ? t('articles.aboutContent') : ''}
                    </p>
                    <p className="text-lg text-gray-300 mb-4">
                        {mounted ? t('articles.joinCommunity') : ''}
                    </p>
                    <div className="flex justify-center mt-6">
                        <a
                            href="https://www.instagram.com/your_instagram_handle"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                        >
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            {mounted ? t('articles.joinCommunitySection') : ''}
                        </a>
                    </div>
                </div>
            </section>

            {/* 最新体验分享 - H2标题 */}
            <section className="w-full max-w-screen-xl mx-auto mb-16 px-4" id="latest-experiences">
                <h2 className="text-3xl font-bold mb-8 text-blue-400 border-l-4 border-blue-500 pl-4 transform skew-x-[-15deg] bg-gray-900 bg-opacity-50 py-2 rounded-r-lg shadow-lg" key={`experiences-title-${uiRefresh}`}>
                    {mounted ? t('articles.latestExperiences') : ''}
                </h2>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                    {experiences.map((item, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid bg-neutral-800 rounded-lg mb-4 shadow-lg border border-neutral-700 w-full"
                        >
                            {/* 顶部：昵称和时间 */}
                            <div className="flex items-center justify-between px-4 pt-4 pb-2">
                                {/* 用户昵称保持原始内容，不进行翻译 */}
                                <h3 className="text-base font-semibold text-blue-400 truncate max-w-[60%]">
                                    {item.username || (mounted ? t('articles.unknownUser') : '...')}
                                </h3>
                                <span className="text-sm text-neutral-400 ml-2 whitespace-nowrap">
                                    {item.createdAt ? new Date(item.createdAt).toLocaleString(currentLang === 'en' ? 'en-US' : 'zh-CN') : ''}
                                </span>
                            </div>
                            {/* 图片区域 */}
                            {item.experienceImageUrl && (
                                <div
                                    className="relative w-full cursor-pointer group my-2"
                                    onClick={() => handleImageClick(item.experienceImageUrl!)}
                                >
                                    <Image
                                        src={item.experienceImageUrl || 'notFund.png'}
                                        alt={currentLang === 'en' ? "Content image" : "内容图片"}
                                        width={320}
                                        height={180}
                                        style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 320, objectFit: 'cover', maxWidth: '100%' }}
                                        className="rounded-md mx-auto shadow-md border border-neutral-800"
                                        unoptimized
                                    />
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {/* 仅翻译UI元素 - 响应语言变化 */}
                                        <span className="text-sm font-semibold" key={`view-text-${uiRefresh}`}>
                                            {mounted ? (currentLang === 'en' ? "View" : "查看") : "..."}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {/* 内容区域 - 保持原始体验内容不翻译 */}
                            {item.experienceContent && (
                                <div className="text-lg text-neutral-200 p-4 pt-2 pb-4 min-h-[48px] break-words">
                                    {item.experienceContent}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* 社区指南部分 - H2标题 */}
            <section className="w-full max-w-screen-xl mx-auto mt-8 mb-12 px-4" key={`guidelines-${uiRefresh}`} id="community-guidelines">
                <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
                    <span className="inline-block border-b-2 border-yellow-500 pb-2 transform rotate-[-2deg]">
                        {mounted ? t('articles.communityGuidelines') : ''}
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                        <h3 className="text-xl font-bold mb-3 text-yellow-300">
                            {mounted ? t('articles.doSection') : ''}
                        </h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                            <li>{mounted ? t('articles.shareExperiences') : ''}</li>
                            <li>{mounted ? t('articles.postScreenshots') : ''}</li>
                            <li>{mounted ? t('articles.giveAdvice') : ''}</li>
                        </ul>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-red-500">
                        <h3 className="text-xl font-bold mb-3 text-red-300">
                            {mounted ? t('articles.dontSection') : ''}
                        </h3>
                        <ul className="list-disc pl-5 text-gray-300 space-y-2">
                            <li>{mounted ? t('articles.noOffensive') : ''}</li>
                            <li>{mounted ? t('articles.noSpam') : ''}</li>
                            <li>{mounted ? t('articles.respectOthers') : ''}</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 参与社区部分 - 新增H2部分 */}
            <section className="w-full max-w-screen-xl mx-auto mb-16 px-4" id="join-community">
                <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center" key={`join-community-${uiRefresh}`}>
                    <span className="inline-block border-b-2 border-purple-500 pb-2">
                        {mounted ? t('articles.joinCommunitySection') : ''}
                    </span>
                </h2>
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
                    <p className="text-lg text-gray-300 mb-6">
                        {mounted ? t('articles.joinCommunityText') : ''}
                    </p>
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg inline-block mx-auto"
                        onClick={handlePublishClick}
                    >
                        {mounted ? t('articles.publishContentButton') : ''}
                    </button>
                </div>
            </section>

            {/* 右侧：发送按钮区域（固定位置） */}
            <div className="fixed bottom-8 right-8 z-50" key={`publish-button-${uiRefresh}`}>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                    onClick={handlePublishClick}
                >
                    {/* 只有在 mounted 之后才使用 t 函数获取按钮文本 */}
                    {mounted ? t('articles.publishContentButton') : ''}
                </button>
            </div>

            {/* 使用独立的发布内容模态框组件 */}
            <PublishContentModal
                isOpen={isPublishModalOpen}
                onClose={handleClosePublishModal}          
            />

            {/* 使用独立的图片预览模态框组件 */}
            <ImagePreviewModal
                imageUrl={isImagePreviewOpen ? previewImageUrl : null}
                onClose={handleCloseImagePreview}
            />
        </div>
    )
}