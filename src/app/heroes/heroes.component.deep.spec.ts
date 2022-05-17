import { forEach } from "@angular-devkit/schematics";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent (deep tests)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 24 },
      { id: 3, name: "SuperDude", strength: 55 },
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });
    fixture = TestBed.createComponent(HeroesComponent);

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDes = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentDes.length).toEqual(3);

    heroComponentDes.forEach((heroComponent, index) => {
      expect(heroComponent.componentInstance.hero).toEqual(HEROES[index]);
    });

    // expect(heroComponentDes[0].componentInstance.hero.name).toEqual('SpiderDude');
    // expect(heroComponentDes[1].componentInstance.hero.name).toEqual('Wonderful Woman');
    // expect(heroComponentDes[2].componentInstance.hero.name).toEqual('SuperDude');
  });

  it(`should call heroService.deleteHero when the hero Component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    heroComponents[1].query(By.css("button")).triggerEventHandler("click", {
      stopPropagation: () => {},
    });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[1])
  });

  it(`should call heroService.deleteHero when the hero Component's delete button is clicked 2`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });
});
