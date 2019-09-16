package com.vma.demo.web.app.router;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * 路由控制器
 *
 * @author: chennaihua
 * @version: 1.created by chennaihua on 2019/8/5.
 */
@Controller
@RequestMapping(value = "web")
public class MainRouter {

    /**
     * frame
     *
     * @return
     */
    @RequestMapping(value = "frame")
    public ModelAndView frame() {
        return new ModelAndView("/app/frame/index");
    }

    /**
     * login
     *
     * @return
     */
    @RequestMapping(value = "login")
    public ModelAndView login() {
        return new ModelAndView("/app/login/index");
    }

}
