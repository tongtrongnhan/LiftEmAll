using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LiftEmAll.Startup))]
namespace LiftEmAll
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
