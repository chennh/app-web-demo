package com.vma.demo.web.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.vma.assist.wraps.ConfigWrap;
import com.vma.freemarker.properties.EnvironmentContext;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * DESCRIPTION
 *
 * @author: chennaihua
 * @version: 1.created by chennaihua on 2019/8/12.
 */
public class ContextParamInterceptor implements HandlerInterceptor {


    private static JSONObject contextJSON;

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        request.setAttribute("context", getContextJSON().toJSONString());
    }

    /**
     *
     * @return
     */
    private JSONObject getContextJSON() {
        if (contextJSON == null) {
            contextJSON = new JSONObject();

            // 应用名称
            contextJSON.put("app", ConfigWrap.getStringValue("spring.application.name"));

            // 环境
            String env = ConfigWrap.getStringValue("spring.profiles.active");
            contextJSON.put("env", env);
            contextJSON.put("isDev", StringUtils.equalsAnyIgnoreCase(env, "dev", "development"));
            contextJSON.put("isProd", StringUtils.equalsAnyIgnoreCase(env, "prod", "production"));

            // 静态资源版本号
            contextJSON.put("staticVersion", EnvironmentContext.VERSION);

            // 接口地址
            contextJSON.put("api", ConfigWrap.getStringValue("vma.app.api"));
        }
        return contextJSON;
    }

}
