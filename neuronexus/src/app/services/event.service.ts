import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  particleStyle = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    'z-index': -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
};

  particleParams = {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 1000
        }
      },
      color: {
        value: ['#ccc']
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#fff'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: 'img/github.svg',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 6,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 120,
        color: '#ccc',
        opacity: 1,
        width: 1
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: false
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 100,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  };
  homeSlides = [
    {
      h1: 'Smart Box Pro',
      h3: 'A Paradigm Shift in Electrophysiology',
      h4: '512-Channel Data Acquisition System Accelerating Neuroscience Research'
    },
    {
      h1: 'Smart Box Pro',
      h3: 'A Paradigm Shift in Electrophysiology',
      h4: '512-Channel Data Acquisition System Accelerating Neuroscience Research'
    }
  ];
  homeSlideConfig = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true
  };

  constructor(
    private storage: StorageService
  ) { }

  private Loading = new BehaviorSubject(true);
  isLoading = this.Loading.asObservable();
  private Login = new BehaviorSubject(this.storage.isAuthenticate());
  isLogin = this.Login.asObservable();

  isHttpRequest = new Subject<boolean>();

  setLoginEmmit(isLogin: boolean) {
    return this.Login.next(isLogin);
  }
  setLoaderEmmit(isLoading: boolean) {
    return this.Loading.next(isLoading);
  }
}
