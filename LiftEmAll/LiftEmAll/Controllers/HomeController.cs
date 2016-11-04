using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LiftEmAll.Models;

namespace LiftEmAll.Controllers
{
	[Authorize]
	public class HomeController : Controller
	{
		Class1 helper=new Class1();
		public ActionResult Index()
		{
			//var request = new DriverRequest
			//{
			//	Id = 2,
			//	Name = "Huynh Tan An",
			//	Email = "ahuynh@amaris.com",
			//	Phone = "12345679",
			//	DriverName = "ddd",
			//	PickUpLocation = "123.12;14.582",
			//	DestinationLocation = "156.52;441.558",
			//	//CreatedDate = DateTime.Now
			//};
			//var c = new Class1();
			////var id = c.SendRequest(request);
			////var id = c.UpdateDriver(request);
			//var id = c.UpdateStatus(2);

			var t=new DriverRequest();
			return View(t);
		}
		public ActionResult About()
		{
			ViewBag.Message = "Your application description page.";

			return View();
		}

		public ActionResult Contact()
		{
			ViewBag.Message = "Your contact page.";

			return View();
		}

		public ActionResult SendRequest(DriverRequest request)
		{
			helper.SendRequest(request);

			return View("Index", request);
		}

        public ActionResult GetRequest()
        {
            var data = BindToMarker(helper.GetAllRequest());

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        private List<Marker> BindToMarker(List<DriverRequest> data )
        {
            var result = new List<Marker>();
            foreach (var item in data)
            {
                var stringArray = item.DestinationLocation.Split(':');
                if (stringArray.Length > 1)
                {
                    result.Add(new Marker()
                    {
                        lat = decimal.Parse(stringArray[0]),
                        lng = decimal.Parse(stringArray[1])
                    });
                }                
            }
            return result;
        }
    }
}