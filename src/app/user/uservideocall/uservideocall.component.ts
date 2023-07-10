import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../user.service.service';
import Swal from 'sweetalert2';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-uservideocall',
  templateUrl: './uservideocall.component.html',
  styleUrls: ['./uservideocall.component.css']
})
export class UservideocallComponent  implements OnInit{

 

  isAudioMuted: boolean = false;
  isVideoMuted: boolean = false;
  domain: string = 'meet.jit.si';
  room: any;
  user: any;
  api: any;
  options: any;
  public messageText = '';
  leader: boolean = false;
  id: any;
  param!: string;
  clubdetails$: any;
  details:any
  appointmentid:string
  showConferencePage: boolean = false; // Flag to control the visibility of the conference page

  constructor(private _router: Router,private userService : UserServiceService,private route: ActivatedRoute ){

    const appointmentId = this.route.snapshot.paramMap.get('id');
    this.userService.getAppointmentById(appointmentId).subscribe((res:any) => { this.details = res } )
  }

  
  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    this.userService.getAppointmentById(appointmentId).subscribe(
      (res: any) => {
        this.appointmentid = res._id
        this.room = `vpaas-magic-cookie-678ef589ec4b4b688ed39e9fb5f355d5/${res._id}`;
        this.user = { name: `Emocare` };

        // Create the room and options here
        this.createRoom();
      },
      (error: any) => {
        // Handle error
        console.error('Failed to retrieve appointment details:', error);
      }
    );
  }


  private createRoom(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
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
  

    this.api = new JitsiMeetExternalAPI(this.domain,this.options)
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
  
    })

  }


  handleClose = () => {
    console.log('closing meet');
  };

  handleParticipantLeft = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    const data = await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    Swal.fire({
      // Swal.fire options
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle confirmed action if needed
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle cancelled action if needed
      }
    }).finally(() => {
      this.destroyConference(); // Call the destroyConference method
    });
  };

  destroyConference(): void {
  // Perform any necessary cleanup or termination logic here
  // For example, disconnect from the video conference and release resources
  if (this.api) {
    this.api.dispose();
  }
}
  


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
