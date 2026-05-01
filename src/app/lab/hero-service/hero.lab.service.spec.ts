import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { IHero } from '../../models/ihero';

describe('hero service (for lab) http testing:', () => {
  let service: HeroServiceForLab;
  let httpTesting: HttpTestingController;
  const heroesUrl = 'http://localhost:3000/heroes';

  let fakeHero: IHero = { id: 1, name: 'Test Hero', strength: 15 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), HeroServiceForLab],
    });

    service = TestBed.inject(HeroServiceForLab);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should make a GET request to fetch hero by id and emit the returned hero', () => {
    const heroId = 1;

    service.getHero(heroId).subscribe({
      next: (data) => {
        expect(data).toEqual(fakeHero);
        expect(data.id).toBe(heroId);
      },
    });

    const testRequest = httpTesting.expectOne(`${heroesUrl}/${heroId}`);
    expect(testRequest.request.method).toBe('GET');

    testRequest.flush(fakeHero);
  });

  it('should make a PUT request to update a hero and emit the updated hero', () => {
    const updatedHero: IHero = {
      id: 1,
      name: 'Updated Hero',
      strength: 20,
    };

    service.updateHero(updatedHero).subscribe({
      next: (data) => {
        expect(data).toEqual(updatedHero);
        expect(data.name).toBe('Updated Hero');
        expect(data.strength).toBe(20);
      },
    });

    const testRequest = httpTesting.expectOne(`${heroesUrl}/${updatedHero.id}`);
    expect(testRequest.request.method).toBe('PUT');
    expect(testRequest.request.body).toEqual(updatedHero);

    testRequest.flush(updatedHero);
  });

  afterEach(() => {
    // Verify no outstanding HTTP requests
    httpTesting.verify();
  });
});
