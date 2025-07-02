package uk.gov.hmcts.dts.taskmanager.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uk.gov.hmcts.dts.taskmanager.model.Task;
import uk.gov.hmcts.dts.taskmanager.service.TaskService;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Task Management", description = "API for managing caseworker tasks")
public class TaskController {

    private final TaskService taskService;

    @Operation(
            summary = "Create a new task",
            description = "Creates a new task for caseworkers with title, description, status, and due date"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Task created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid task data provided")
    })
    @PostMapping
    public ResponseEntity<Task> createTask(
            @Parameter(description = "Task details to create", required = true)
            @Valid @RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    @Operation(
            summary = "Get task by ID",
            description = "Retrieves a specific task using its unique identifier"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task found and returned"),
            @ApiResponse(responseCode = "404", description = "Task not found with provided ID")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(
            @Parameter(description = "Unique task identifier", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
            @PathVariable UUID id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @Operation(
            summary = "Get all tasks",
            description = "Retrieves a list of all tasks in the system"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of tasks returned (may be empty)")
    })
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @Operation(
            summary = "Update task status",
            description = "Updates the status of an existing task (e.g., TODO, IN_PROGRESS, COMPLETED)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Task status updated successfully"),
            @ApiResponse(responseCode = "404", description = "Task not found with provided ID"),
            @ApiResponse(responseCode = "400", description = "Invalid status provided")
    })
    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(
            @Parameter(description = "Unique task identifier", required = true)
            @PathVariable UUID id,
            @Parameter(description = "New status for the task", required = true, example = "COMPLETED")
            @RequestParam String status) {
        Task updatedTask = taskService.updateTaskStatus(id, status);
        return ResponseEntity.ok(updatedTask);
    }

    @Operation(
            summary = "Delete task",
            description = "Permanently removes a task from the system"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Task deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Task not found with provided ID")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "Unique task identifier", required = true)
            @PathVariable UUID id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
