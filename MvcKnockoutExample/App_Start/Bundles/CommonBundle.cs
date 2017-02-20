using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace MvcKnockoutExample.Bundles
{
    public static class CommonBundle
    {
        public static Bundle Styles()
        {
            return new StyleBundle("~/Content/common/css").Include("~/Content/Site-Common.css");
        }

        public static Bundle Scripts()
        {
            return new ScriptBundle("~/bundles/common/js").Include(
                      "~/App/globHelper.js").Include("~/App/service.js");
        }
    }
}