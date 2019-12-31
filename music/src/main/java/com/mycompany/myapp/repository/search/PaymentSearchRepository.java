package com.mycompany.myapp.repository.search;

import com.mycompany.myapp.domain.Payment;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Payment} entity.
 */
public interface PaymentSearchRepository extends ElasticsearchRepository<Payment, Long> {
}
