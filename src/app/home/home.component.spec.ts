import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RouterTestingModule } from '../../../node_modules/@angular/router/testing';
import { UsersService } from '../services/users/users.service';
import { HomeComponent } from './home.component';

const users = [{
  id: '1',
  name: 'Jane',
  role: 'Designer',
  pokemon: 'Blastoise'
}];

class MockUsersService {
  all() {
    return of(users);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ HomeComponent ],
      providers: [
        { provide: UsersService, useClass: MockUsersService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the view with a list of users', () => {
    const userList = fixture.debugElement.queryAll(By.css('[data-test=name]'));
    expect(userList[0].nativeElement.textContent).toEqual('Jane');
  });
});
