using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LiftEmAll.Models;

namespace LiftEmAll.Controllers
{
    [AllowAnonymous]
    public class HomeController : Controller
    {
        Class1 helper = new Class1();
        public ActionResult Index()
        {
            var t = new DriverRequest();
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

            return View("Index", new DriverRequest());
        }

        public ActionResult GetRequest()
        {
            var data = BindToMarker(helper.GetAllRequest());

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        private List<Marker> BindToMarker(List<DriverRequest> data)
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

        public ActionResult GetAllRequest()
        {
            var requestList = helper.GetAllRequest();
            return requestList == null || requestList.Count == 0 ? null : PartialView("_AllRequest", requestList);
        }
    }
}