using System.Collections.Generic;

namespace Voks.Models
{
    public sealed class MainViewModel
    {
        public IEnumerable<CategoryViewModel> Categories { get; set; }

        public string CategoriesBasePath { get; set; }
    }
}