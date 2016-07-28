using System.Web.Optimization;
using BundleTransformer.Core.Transformers;

namespace Voks
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            var cssBundle = new StyleBundle("~/bundles/css")
                .Include("~/Content/bootstrap/bootstrap.less")
                .Include("~/Content/app/app.less");
            SetupLessBundle(cssBundle);
            bundles.Add(cssBundle);

            BundleTable.EnableOptimizations = true;
        }

        private static void SetupLessBundle(Bundle bundle)
        {
            bundle.Transforms.Add(new StyleTransformer());
        }
    }
}