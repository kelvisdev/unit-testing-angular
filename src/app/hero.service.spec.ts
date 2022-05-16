import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

fdescribe("HeroService", () => {
  let mockMessageService;
  let messageService: MessageService;
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
    // messageService = TestBed.inject(MessageService);
  });

  describe("getHero", () => {
    it("should call get with the correct URL", () => {
      // call getHero()
      service.getHero(4).subscribe();

      // test that the URL was correct
      const req = httpTestingController.expectOne("api/heroes/4");

      req.flush({ id: 4, name: "SuperDude", strength: 100 });
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    });
  });
});
