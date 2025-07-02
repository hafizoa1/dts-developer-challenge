package uk.gov.hmcts.dts.taskmanager.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uk.gov.hmcts.dts.taskmanager.exception.TaskNotFoundException;
import uk.gov.hmcts.dts.taskmanager.model.Task;
import uk.gov.hmcts.dts.taskmanager.repository.TaskRepository;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public Task getTaskById(UUID id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        if (tasks.isEmpty()) {
            throw new TaskNotFoundException("No tasks found");
        }
        return tasks;
    }

    public Task createTask(Task task) {
        // You might want to validate here
        return taskRepository.save(task);
    }


    public Task updateTaskStatus(UUID id, String status) {
        Task task = getTaskById(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    public void deleteTask(UUID id) {
        Task task = getTaskById(id); // Verify it exists first
        taskRepository.delete(task);
    }
}

//maybe we create a dto just to be extra please
