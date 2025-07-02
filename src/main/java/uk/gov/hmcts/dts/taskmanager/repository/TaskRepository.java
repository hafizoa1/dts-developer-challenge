package uk.gov.hmcts.dts.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uk.gov.hmcts.dts.taskmanager.model.Task;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

}
