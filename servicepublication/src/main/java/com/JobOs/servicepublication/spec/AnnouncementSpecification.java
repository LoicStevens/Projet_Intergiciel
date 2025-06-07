package com.JobOs.servicepublication.spec;

import com.JobOs.servicepublication.model.Announcement;
import com.JobOs.servicepublication.model.ProjectType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class AnnouncementSpecification {

    public static Specification<Announcement> hasLocation(String location) {
        return (root, query, cb) -> {
            if (location == null || location.isEmpty()) return cb.conjunction();
            return cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%");
        };
    }

    public static Specification<Announcement> hasMaxPrice(Double price) {
        return (root, query, cb) -> {
            if (price == null) return cb.conjunction();
            return cb.lessThanOrEqualTo(root.get("price"), price);
        };
    }

    public static Specification<Announcement> hasProjectType(ProjectType projectType) {
        return (root, query, cb) -> {
            if (projectType == null) return cb.conjunction();
            return cb.equal(root.get("projectType"), projectType);
        };
    }

    public static Specification<Announcement> hasSkill(String skill) {
    return (root, query, cb) -> {
        if (skill == null || skill.isEmpty()) return cb.conjunction();
        return cb.like(cb.lower(root.get("skills")), "%" + skill.toLowerCase() + "%");
    };
}

}
