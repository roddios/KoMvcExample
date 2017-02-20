using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace MvcKnockoutExample.Bundles
{
    public static class BootstrapBundle
    {
        public static Bundle Styles()
        {
            return new StyleBundle("~/Content/bootstrap/css").Include(
                      "~/Content/bootstrap.css"
                      );
        }

        public static Bundle Scripts()
        {
            return new ScriptBundle("~/bundles/ko/js").Include(
                     "~/Scripts/bootstrap/bootstrap.js");
        }
    }
}