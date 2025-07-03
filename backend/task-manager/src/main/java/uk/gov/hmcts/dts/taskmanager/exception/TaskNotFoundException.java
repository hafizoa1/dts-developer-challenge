package uk.gov.hmcts.dts.taskmanager.exception;

import java.util.UUID;

public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(UUID id) {
        super("Task not found with ID: " + id);
    }

    public TaskNotFoundException(String message) {
        super(message);
    }
}
