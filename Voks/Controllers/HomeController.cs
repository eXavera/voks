using System.IO;
using System.Linq;
using System.Web.Mvc;
using Voks.Models;

namespace Voks.Controllers
{
    public class HomeController : Controller
    {
        private const string CATEGORIES_PATH = "~/Content/Images/Categories";

        public ActionResult Index()
        {
            var viewModel = new MainViewModel()
            {
                Categories = Directory.EnumerateDirectories(Server.MapPath(CATEGORIES_PATH))
                    .Select(dir => new CategoryViewModel()
                    {
                        Name = Path.GetFileName(dir),
                        Images = Directory.EnumerateFiles(dir).Select(file => Path.GetFileName(file))
                    })
                    .OrderBy(c => c.Name)
                    .ToArray(),
                CategoriesBasePath = Url.Content(CATEGORIES_PATH)
            };

            return View(viewModel);
        }
    }
}