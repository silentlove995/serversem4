package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.PaymentService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.PaymentDTO;
import com.mycompany.myapp.service.dto.PaymentCriteria;
import com.mycompany.myapp.service.PaymentQueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Payment}.
 */
@RestController
@RequestMapping("/api")
public class PaymentResource {

    private final Logger log = LoggerFactory.getLogger(PaymentResource.class);

    private static final String ENTITY_NAME = "payment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaymentService paymentService;

    private final PaymentQueryService paymentQueryService;

    public PaymentResource(PaymentService paymentService, PaymentQueryService paymentQueryService) {
        this.paymentService = paymentService;
        this.paymentQueryService = paymentQueryService;
    }

    /**
     * {@code POST  /payments} : Create a new payment.
     *
     * @param paymentDTO the paymentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paymentDTO, or with status {@code 400 (Bad Request)} if the payment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/payments")
    public ResponseEntity<PaymentDTO> createPayment(@RequestBody PaymentDTO paymentDTO) throws URISyntaxException {
        log.debug("REST request to save Payment : {}", paymentDTO);
        if (paymentDTO.getId() != null) {
            throw new BadRequestAlertException("A new payment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentDTO result = paymentService.save(paymentDTO);
        return ResponseEntity.created(new URI("/api/payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /payments} : Updates an existing payment.
     *
     * @param paymentDTO the paymentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentDTO,
     * or with status {@code 400 (Bad Request)} if the paymentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paymentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/payments")
    public ResponseEntity<PaymentDTO> updatePayment(@RequestBody PaymentDTO paymentDTO) throws URISyntaxException {
        log.debug("REST request to update Payment : {}", paymentDTO);
        if (paymentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaymentDTO result = paymentService.save(paymentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /payments} : get all the payments.
     *

     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of payments in body.
     */
    @GetMapping("/payments")
    public ResponseEntity<List<PaymentDTO>> getAllPayments(PaymentCriteria criteria) {
        log.debug("REST request to get Payments by criteria: {}", criteria);
        List<PaymentDTO> entityList = paymentQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
    * {@code GET  /payments/count} : count all the payments.
    *
    * @param criteria the criteria which the requested entities should match.
    * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
    */
    @GetMapping("/payments/count")
    public ResponseEntity<Long> countPayments(PaymentCriteria criteria) {
        log.debug("REST request to count Payments by criteria: {}", criteria);
        return ResponseEntity.ok().body(paymentQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /payments/:id} : get the "id" payment.
     *
     * @param id the id of the paymentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paymentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payments/{id}")
    public ResponseEntity<PaymentDTO> getPayment(@PathVariable Long id) {
        log.debug("REST request to get Payment : {}", id);
        Optional<PaymentDTO> paymentDTO = paymentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paymentDTO);
    }

    /**
     * {@code DELETE  /payments/:id} : delete the "id" payment.
     *
     * @param id the id of the paymentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        log.debug("REST request to delete Payment : {}", id);
        paymentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/payments?query=:query} : search for the payment corresponding
     * to the query.
     *
     * @param query the query of the payment search.
     * @return the result of the search.
     */
    @GetMapping("/_search/payments")
    public List<PaymentDTO> searchPayments(@RequestParam String query) {
        log.debug("REST request to search Payments for query {}", query);
        return paymentService.search(query);
    }
}
