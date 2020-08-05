import { TestBed, inject } from '@angular/core/testing';

import { DesignationService } from './designation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DESIGNATION_URL } from '../utils/url';

describe('DesignationService', () => {

  let service: DesignationService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DesignationService]
    });
  });

  beforeEach(inject(
    [DesignationService, HttpTestingController],
    (_service, _httpMock) => {
      service = _service;
      httpTestingController = _httpMock;
    }
  ));

  it('should get designation details', (done) => {
    let mockType = "hr";
    service.getDesignationDetails(mockType).subscribe(data => {
      expect(data).toEqual({});
      done();
    });
    const req = httpTestingController.expectOne(DESIGNATION_URL(mockType));
    expect(req.request.method).toEqual('GET');
    req.flush({});
    httpTestingController.verify();
  });

});

