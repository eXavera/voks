using System.IO;
using System.Linq;
using System.Web.Mvc;
using Voks.Models;

namespace Voks.Controllers
{
    public class HomeController : Controller
    {
        private string CategoriesPath => Server.MapPath("~/Content/Images/Categories");

        public ActionResult Index()
        {
            var viewModel = new MainViewModel();
            viewModel.Categories = Directory.EnumerateDirectories(CategoriesPath)
                .Select(dir => new CategoryViewModel()
                {
                    Name = Path.GetFileName(dir),
                    Images = Directory.EnumerateFiles(dir).Select(file => Path.GetFileName(file))
                })
                .OrderBy(c => c.Name)
                .ToArray();

            viewModel.CategoriesBasePath = CategoriesPath;

            return View(viewModel);
        }
    }
}