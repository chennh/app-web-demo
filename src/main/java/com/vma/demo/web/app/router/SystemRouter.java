package com.vma.demo.web.app.router;


import com.vma.web.mvc.router.CenterRouter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * DESCRIPTION
 *
 * @author: chennaihua
 * @version: 1.created by chennaihua on 2019/8/7.
 */
@Controller
@RequestMapping(value = SystemRouter.BASE_ROUTER)
public class SystemRouter extends CenterRouter {

    static final String BASE_ROUTER = "/app/system/";

    @Override
    protected String baseRouterMapping() {
        return BASE_ROUTER;
    }

}
