using System.Web.Optimization;

namespace LiftEmAll
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/base").Include(
                      "~/Scripts/modernizr-*",                      
                      "~/Scripts/jquery-{version}.js",
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js",
                      "~/Scripts/jquery.easing.1.3.js",
                      "~/Scripts/jquery.flot.js",
                      "~/Scripts/jquery.flot.time.js",
                      "~/Scripts/jquery.flot.animator.min.js",
                      "~/Scripts/jquery.flot.resize.min.js",
                      "~/Scripts/sparkline.min.js",
                      "~/Scripts/jquery.playSound.js",
                      "~/Scripts/bootstrao-growl.js"));

            bundles.Add(new ScriptBundle("~/bundles/pages/home").Include(
                      "~/Scripts/App/App.js",
                      "~/Scripts/pages/home.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      //"~/Content/bootstrap.css",
                      "~/Content/animate.css",
                      "~/Content/material-design-iconic-font.css",
                      "~/Content/palette.css",
                      "~/Content/app.min.1.css",
                      "~/Content/app.min.2.css",
                      "~/Content/font-awesome.css"));

            bundles.Add(new StyleBundle("~/Content/styles/home").Include(
                      "~/Content/styles/home.css"));

            //BundleTable.EnableOptimizations = true;
        }
    }
}
