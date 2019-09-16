package com.vma.demo.web.config;

import com.vma.core.config.VmaWebMvcConfig;
import com.vma.demo.web.interceptor.ContextParamInterceptor;
import com.vma.web.mvc.interceptor.LoginInterceptor;
import com.vma.web.mvc.interceptor.RouterInterceptor;
import com.vma.web.properties.VmaWebProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;

/**
 * ${DESCRIPTION}
 *
 * @author: chennaihua
 * @version: 1.created by chennaihua on 2018/10/23.
 */
@Configuration
public class WebMvcConfig extends VmaWebMvcConfig {

    @Autowired
    private VmaWebProperties webProperties;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 参数拦截器
        registry.addInterceptor(new ContextParamInterceptor())
                .addPathPatterns("/**");

        // 登录拦截器
        registry.addInterceptor(new LoginInterceptor(webProperties.getLoginInterceptorProperties()))
                .addPathPatterns("/web/**")
                .addPathPatterns("/app/**")
                .excludePathPatterns("/web/login");

        // 路由异常拦截器
        registry.addInterceptor(new RouterInterceptor(webProperties.getRouterInterceptorProperties()))
                .addPathPatterns("/**")
                .excludePathPatterns("/static/**")
                .excludePathPatterns("/error");

        super.addInterceptors(registry);
    }

}
