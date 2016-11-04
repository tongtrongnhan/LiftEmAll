using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace LiftEmAll
{
    [HubName("notificationHub")]
    public class NotificationHub : Hub
    {
        public static void Send(string data)
        {

            IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationHub>();
            hubContext.Clients.All.send(data);
        }
    }
}