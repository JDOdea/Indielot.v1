using Indielot.Data;
using Indielot.Models;
using Indielot.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Indielot.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private IndielotDbContext _dbContext;

    public TaskController(IndielotDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.Tasks);
    }

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(string id)
    {
        Models.Task task = _dbContext.Tasks.SingleOrDefault(t => t.Id == Guid.Parse(id));

        if (task != null)
        {
            return Ok(task);
        }

        return NotFound();
    }

    [HttpGet("production/{productionId}")]
    //[Authorize]
    public IActionResult GetByProductionId(string productionId)
    {
        Production production = _dbContext.Productions.SingleOrDefault(p => p.Id == Guid.Parse(productionId));

        if (production != null)
        {
            return Ok(_dbContext.Tasks
                .Include(t => t.AssignedUser)
                .Where(t => t.ProductionId == Guid.Parse(productionId))
                .Select(t => new TaskDTO
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    AssignedTo = t.AssignedUser.FullName,
                    DueDate = t.DueDate,
                    TaskStatus = t.GetTaskStatusName(t.TaskStatus)
                }));
        }

        return NotFound();
    }
}