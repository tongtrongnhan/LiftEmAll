using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(LiftEmAll.Startup))]
namespace LiftEmAll
{
    public partial class Startup
    {
        // Methods
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }

}
