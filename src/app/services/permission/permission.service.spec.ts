import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PermissionService } from './permission.service';
import { routes } from 'src/app/app.routes';
import { Router } from '@angular/router';
import { sleep } from 'src/app/shared/helpers/utils';
import { SpotifyService } from '../spotify/spotify.service';

describe('PermissionService', () => {
  let service: PermissionService;
  let router: Router;
  let spotifyServiceSpy: SpotifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(PermissionService);
    router = TestBed.inject(Router);
    router.initialNavigation();
    spotifyServiceSpy = TestBed.inject(SpotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('hasPermission', () => {
    it('should return false when no has token in local storage', async () => {
      // average
      localStorage.clear();

      // act
      const hasPermission = await service.hasPermission();
      await sleep(1000);

      // assert
      expect(hasPermission).toBeFalse();
    });

    it('should return redirect to login router when no has token in local storage', async () => {
      // average
      localStorage.clear();
      let spy: jasmine.Spy = spyOn(
        service,
        'handleNotAuthenticated'
      ).and.stub();

      // act
      await service.hasPermission();
      await sleep(1000);

      // assert
      expect(spy).toHaveBeenCalledTimes(1);
      expect(router.url).toBe('/login');
    });

    it('should call spotifyService and start a user with success', async () => {
      // average
      localStorage.setItem('token', 'MOCKED_VALUE');
      spyOn(spotifyServiceSpy, 'startUser').and.resolveTo(true);

      // act
      const userStarted = await service.hasPermission();

      // assert
      expect(spotifyServiceSpy.startUser).toHaveBeenCalled();
      expect(userStarted).toBeTrue();
    });

    it('should call spotifyService and not start a user', async () => {
      // average
      localStorage.setItem('token', 'MOCKED_VALUE');
      spyOn(spotifyServiceSpy, 'startUser').and.resolveTo(false);

      // act
      const userNotStarted = await service.hasPermission();

      // assert
      expect(spotifyServiceSpy.startUser).toHaveBeenCalled();
      expect(userNotStarted).toBeFalse();
    });

    it('should return false when spotifyService throw a exception', async () => {
      // average
      localStorage.setItem('token', 'MOCKED_VALUE');
      spyOn(spotifyServiceSpy, 'startUser').and.rejectWith(false);

      // act
      const userNotStarted = await service.hasPermission();

      // assert
      expect(spotifyServiceSpy.startUser).toHaveBeenCalled();
      expect(userNotStarted).toBeFalse();
    });
  });

  describe('handleNotAuthenticated', () => {
    it('should remove item token into local storage', async () => {
      // act
      service['handleNotAuthenticated']();

      // assert
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should navigate user to login route', async () => {
      // average
      const delayNavigate = 1000;

      // act
      service['handleNotAuthenticated']();
      await sleep(delayNavigate);

      // assert
      expect(router.url).toBe('/login');
    });
  });
});
