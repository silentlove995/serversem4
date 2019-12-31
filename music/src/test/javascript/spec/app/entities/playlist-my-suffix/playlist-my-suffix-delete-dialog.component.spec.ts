import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MusicTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { PlaylistMySuffixDeleteDialogComponent } from 'app/entities/playlist-my-suffix/playlist-my-suffix-delete-dialog.component';
import { PlaylistMySuffixService } from 'app/entities/playlist-my-suffix/playlist-my-suffix.service';

describe('Component Tests', () => {
  describe('PlaylistMySuffix Management Delete Component', () => {
    let comp: PlaylistMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<PlaylistMySuffixDeleteDialogComponent>;
    let service: PlaylistMySuffixService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MusicTestModule],
        declarations: [PlaylistMySuffixDeleteDialogComponent]
      })
        .overrideTemplate(PlaylistMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaylistMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistMySuffixService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.clear();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
