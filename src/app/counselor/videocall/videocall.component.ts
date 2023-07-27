import { AdminService } from './../../admin/admin.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CounselorService } from '../counselor.service';
import Swal from 'sweetalert2';
declare var JitsiMeetExternalAPI: any;


@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {

  meetingStartTime: Date;
  isAudioMuted: boolean = false;
  isVideoMuted: boolean = false;
  domain: string = 'meet.jit.si';
  room: any;
  user: any;
  api: any;
  options: any;
  public messageText = '';
  id: any;
  param!: string;
  details: any
  appointmentid: string
  token:string | null


  constructor(private _router: Router, private counselorService: CounselorService, private route: ActivatedRoute) {

    const appointmentId = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('CToken');
    
    this.counselorService.getAppointmentById(appointmentId,this.token).subscribe((res: any) => { this.details = res })
    
  }


  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    this.counselorService.getAppointmentById(appointmentId,this.token).subscribe(
      (res: any) => {
        this.appointmentid = res._id
        this.room = `vpaas-magic-cookie-678ef589ec4b4b688ed39e9fb5f355d5/${res._id}`;
        this.meetingStartTime = new Date();
        this.user = { name: res.counselor.name };


        this.createRoom();
      },
      (error: any) => {

        console.error('Failed to retrieve appointment details:', error);
      }
    );
  }


  private createRoom(): void {
    this.options = {
      roomName: this.room,
      width: 1300,
      height: 700,
      configOverWrite: {
        proJoinPage: false
      },
      interfaceConfigOverWrite: {
        TILE_VIEW_MAX_COLUMNS: 8
      },
      parentNode: document.querySelector('#jaas-container'),
      userInfo: {
        displayName: this.user.name
      }
    };


    this.api = new JitsiMeetExternalAPI(this.domain, this.options)
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      conferenceWillStart: this.handleConferenceWillStart,

    })

  }


  handleClose = () => {
    console.log('closing meet');
  };

  handleParticipantLeft = async (participant: any) => {
    const data = await this.getParticipants();
  };
  handleConferenceWillStart = () => {
    console.log("The conference is about to start");
  };

  handleParticipantJoined = async (participant: any) => {
    console.log("hey there");

    const data = await this.getParticipants();

  };

  handleVideoConferenceJoined = async (participant: any) => {
    const data = await this.getParticipants();
  };

  getMeetingDurationInMinutes(): string {
    if (this.meetingStartTime === undefined) {
      return '0 minutes';
    }
  
    const now = new Date();
    const duration = now.getTime() - this.meetingStartTime.getTime();
  
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
  
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return `${formattedTime} minutes`;
  }
  

  handleVideoConferenceLeft = () => {
    const duration = this.getMeetingDurationInMinutes();
  
    Swal.fire({
      title: 'Confirm Action',
      text: 'Are you finished with your consultation?',
      showCancelButton: true,
      showCloseButton: false,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#28A745',
      cancelButtonText: 'No',
      cancelButtonColor: '#DC3545',
      showClass: {
        popup: 'swal2-show'
      },
      hideClass: {
        popup: 'swal2-hide'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.counselorService.updateAppointment(this.appointmentid,duration).subscribe((response: any) => {
          Swal.fire('Success', `The meeting has ended. The duration of the meeting was ${duration}`, 'success');
          this._router.navigate(['/counselor/home']);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The meeting has not been updated.', 'info');
        this._router.navigate([`/counselor/home`]);
      }
    });
  };
  




  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo());
      }, 500);
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command === 'hangup') {
      this._router.navigate(['/']);
    }
    if (command === 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }
    if (command === 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }


}
