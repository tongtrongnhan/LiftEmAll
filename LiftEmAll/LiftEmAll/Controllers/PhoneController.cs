using System.Web.Mvc;

namespace LiftEmAll.Controllers
{
    public class PhoneController : Controller
    {
        // GET: Phone
        public ActionResult Index()
        {
            NotificationHub.Send("CLGT");
            return View();
        }
    }
}