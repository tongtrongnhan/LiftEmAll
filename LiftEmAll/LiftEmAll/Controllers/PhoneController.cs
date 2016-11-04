using System.Web.Mvc;
using System.Web.UI.WebControls;
using LiftEmAll.Models;

namespace LiftEmAll.Controllers
{
    public class PhoneController : Controller
    {
        Class1 helper = new Class1();
        // GET: Phone
        public ActionResult Index(int requestId)
        {
            var request = helper.GetDriverRequestById(requestId);

            if (request != null)
            {
                var message = string.Format("Your Pick-up request has been accept!");
                NotificationHub.Send(message);
                helper.UpdateStatus(requestId);
            }

            return RedirectToAction("Index", "Home");
        }
    }
}