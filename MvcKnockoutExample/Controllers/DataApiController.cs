using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MvcKnockoutExample.Controllers
{
    [RoutePrefix("api")]
    public class DataApiController : ApiController
    {

        [Route("students")]
        public async Task<HttpResponseMessage> GetStudents(HttpRequestMessage request)
        {
            try
            {
                var students = new List<Entities.Student>();
                students.Add(new Entities.Student { Id = 1, Name = "John Smith" });
                students.Add(new Entities.Student { Id = 2, Name = "Joe MacDonald" });

              
                return request.CreateResponse(HttpStatusCode.OK, students);
            }
            catch (Exception ex)
            {
               // log errors
                return request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, ex);
            }
        }
    }
}
