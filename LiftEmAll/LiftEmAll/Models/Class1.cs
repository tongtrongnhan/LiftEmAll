using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace LiftEmAll.Models
{
	public class Class1
	{
		public int SendRequest(DriverRequest request)
		{
			var db = new LiftEmAllEntities();
			request.CreatedDate=DateTime.Now;
			db.DriverRequests.Add(request);
			db.SaveChanges();
			return request.Id;
		}

		public List<DriverRequest> GetAllRequest()
		{
			var db = new LiftEmAllEntities();
			return db.DriverRequests.ToList();
		}

		public DriverRequest GetDriverRequestById(int id)
		{
			var db = new LiftEmAllEntities();
			return db.DriverRequests.FirstOrDefault(x => x.Id == id);
		}

		public int UpdateDriver(DriverRequest r)
		{
			var db = new LiftEmAllEntities();
			var request = db.DriverRequests.Find(r.Id);
			if (request == null) return 0;
			request.DriverName = r.DriverName;
			request.UpdatedDate=DateTime.Now;
			db.SaveChanges();
			return request.Id;
		}
		public int UpdateStatus(int id)
		{
			var db = new LiftEmAllEntities();
			var request = db.DriverRequests.Find(id);
			if (request == null) return 0;
			request.IsDone = true;
			request.UpdatedDate = DateTime.Now;
			db.SaveChanges();
			return request.Id;
		}
	}
}