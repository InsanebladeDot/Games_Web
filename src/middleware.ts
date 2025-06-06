import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取请求的路径
  const path = request.nextUrl.pathname;
  
  // 处理/home路径的重定向
  if (path === '/home') {
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    // 如果有id参数，重定向到新的动态路由
    if (id) {
      // 获取当前语言，从路径或cookie中判断
      const langFromPath = path.startsWith('/en') ? 'en' : 'zh';
      
      // 重定向到新的动态路由
      return NextResponse.redirect(new URL(`/${langFromPath}/game/${id}`, request.url));
    }
    
    // 如果没有id参数，重定向到首页
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // 对于其他路径，不做处理
  return NextResponse.next();
}

// 配置匹配的路径
export const config = {
  matcher: ['/home'],
}; 