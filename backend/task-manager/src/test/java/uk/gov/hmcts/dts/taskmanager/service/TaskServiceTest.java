package uk.gov.hmcts.dts.taskmanager.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import uk.gov.hmcts.dts.taskmanager.exception.TaskNotFoundException;
import uk.gov.hmcts.dts.taskmanager.model.Task;
import uk.gov.hmcts.dts.taskmanager.repository.TaskRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task1;
    private Task task2;
    private UUID uuid1;
    private UUID uuid2;

    @BeforeEach
    void setUp() {

        uuid1 = UUID.randomUUID();
        uuid2 = UUID.randomUUID();

        task1 = Task.builder()
                .id(uuid1)
                .title("Buy groceries")
                .description("Milk, bread, eggs")
                .status("TODO")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        task2 = Task.builder()
                .id(uuid2)
                .title("Walk the dog")
                .description("Long walk in the park")
                .status("IN_PROGRESS")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    @Test
    void testGetTaskById_Success() {

        when(taskRepository.findById(uuid1)).thenReturn(Optional.of(task1));

        Task foundTask = taskService.getTaskById(uuid1);


        assertNotNull(foundTask, "Task should not be null");
        assertEquals(uuid1, foundTask.getId(), "Returned task ID should match");
        assertEquals("Buy groceries", foundTask.getTitle(), "Returned task title should match");


        verify(taskRepository, times(1)).findById(uuid1);
    }

    @Test
    void testGetTaskById_NotFound() {

        when(taskRepository.findById(any(UUID.class))).thenReturn(Optional.empty());


        TaskNotFoundException thrown = assertThrows(TaskNotFoundException.class, () -> {
            taskService.getTaskById(UUID.randomUUID());
        }, "TaskNotFoundException should be thrown when task is not found");


        assertTrue(thrown.getMessage().contains("Task not found with ID: "), "Exception message should contain ID");


        verify(taskRepository, times(1)).findById(any(UUID.class));
    }

    @Test
    void testGetAllTasks_Success() {

        List<Task> mockTasks = Arrays.asList(task1, task2);
        when(taskRepository.findAll()).thenReturn(mockTasks);


        List<Task> allTasks = taskService.getAllTasks();

        // Assert: Verify the result.
        assertNotNull(allTasks, "List of tasks should not be null");
        assertEquals(2, allTasks.size(), "Should return 2 tasks");
        assertTrue(allTasks.contains(task1), "List should contain task1");
        assertTrue(allTasks.contains(task2), "List should contain task2");

        // Verify that taskRepository.findAll was called exactly once.
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetAllTasks_NoTasksFound() {

        when(taskRepository.findAll()).thenReturn(Collections.emptyList());


        TaskNotFoundException thrown = assertThrows(TaskNotFoundException.class, () -> {
            taskService.getAllTasks();
        }, "TaskNotFoundException should be thrown when no tasks are found");


        assertEquals("No tasks found", thrown.getMessage(), "Exception message should match");


        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testCreateTask_Success() {

        when(taskRepository.save(task1)).thenReturn(task1);


        Task createdTask = taskService.createTask(task1);

        assertNotNull(createdTask, "Created task should not be null");
        assertEquals(task1.getId(), createdTask.getId(), "Created task ID should match original");
        assertEquals(task1.getTitle(), createdTask.getTitle(), "Created task title should match original");


        verify(taskRepository, times(1)).save(task1);
    }

    @Test
    void testUpdateTaskStatus_Success() {

        String newStatus = "DONE";

        when(taskRepository.findById(uuid1)).thenReturn(Optional.of(task1));

        Task updatedTask = Task.builder()
                .id(task1.getId())
                .title(task1.getTitle())
                .description(task1.getDescription())
                .status(newStatus)
                .createdAt(task1.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .build();
        when(taskRepository.save(any(Task.class))).thenReturn(updatedTask);


        Task result = taskService.updateTaskStatus(uuid1, newStatus);


        assertNotNull(result, "Resulting task should not be null");
        assertEquals(uuid1, result.getId(), "Task ID should remain the same");
        assertEquals(newStatus, result.getStatus(), "Task status should be updated");


        verify(taskRepository, times(1)).findById(uuid1);

        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testUpdateTaskStatus_TaskNotFound() {
        when(taskRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> {
            taskService.updateTaskStatus(UUID.randomUUID(), "COMPLETED");
        }, "TaskNotFoundException should be thrown when updating a non-existent task");

        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void testDeleteTask_Success() {

        when(taskRepository.findById(uuid1)).thenReturn(Optional.of(task1));


        taskService.deleteTask(uuid1);


        verify(taskRepository, times(1)).findById(uuid1);
        verify(taskRepository, times(1)).delete(task1);
    }

    @Test
    void testDeleteTask_TaskNotFound() {

        when(taskRepository.findById(any(UUID.class))).thenReturn(Optional.empty());


        assertThrows(TaskNotFoundException.class, () -> {
            taskService.deleteTask(UUID.randomUUID());
        }, "TaskNotFoundException should be thrown when deleting a non-existent task");


        verify(taskRepository, never()).delete(any(Task.class));
    }
}