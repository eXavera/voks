using System.Collections.Generic;

namespace Voks.Models
{
    public sealed class CategoryViewModel
    {
        public IEnumerable<string> Images { get; set; }

        public string Name { get; set; }
    }
}