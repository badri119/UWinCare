import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [
        IonicModule.forRoot(), 
        ExploreContainerComponentModule,
        AppRoutingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to article details page on list item', () => {

    spyOn(router, 'navigate');
    component.articleDetails();
    expect(router.navigate).toHaveBeenCalledWith(['article-details']);
  })


});
