using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace MvcKnockoutExample.Bundles
{
    public static class HomeBundle
    {
        public static Bundle Styles()
        {
            return new StyleBundle("~/Content/home/css").Include("~/Content/Site-Home.css");
        }

        public static Bundle Scripts()
        {
            return new ScriptBundle("~/bundles/home/js").Include(
                      "~/App/home-ko.js");
        }
    }
}