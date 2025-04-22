package com.example.employee_attendance.repository;

import com.example.employee_attendance.model.LeaveCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaveCountRepository extends JpaRepository<LeaveCount, Long> {
//    @Query("SELECT lc FROM LeaveCount lc WHERE lc.user.id = :userId AND lc.leaveType.ltId = :ltId")
//    Optional<LeaveCount> findLeaveCount(@Param("userId") Long userId, @Param("ltId") Long ltId);

    Optional<LeaveCount> findByUser_UserIdAndLeaveType_LtId(Long userId, Long ltId);

    List<LeaveCount> findByUser_UserId(Long userId);
}
