using MvcKnockoutExample.Bundles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace MvcKnockoutExample
{
    public class BundleConfig
    {

        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/Site.css"
            ));

            bundles.Add(new ScriptBundle("~/bundles/ko").Include(
                      "~/Scripts/knockout-{version}.js"));
            //knockout-3.4.1.js



            bundles.Add(BootstrapBundle.Scripts());
            bundles.Add(BootstrapBundle.Styles());

            bundles.Add(CommonBundle.Scripts());
            bundles.Add(CommonBundle.Styles());
            bundles.Add(HomeBundle.Scripts());
            bundles.Add(HomeBundle.Styles());


            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862

#if (DEBUG)
            BundleTable.EnableOptimizations = false;

#else
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
