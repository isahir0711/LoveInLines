import { Component, Input } from '@angular/core';
import { ToastInfo } from '../../interfaces/toastInfo';
import { ToastService } from '../../services/toast/toast.service';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-toast',
    standalone: true,
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.css',
    imports: [ButtonComponent]
})
export class ToastComponent {
  @Input() toastInfo: ToastInfo = { title: '', type: '' };
  @Input() tId!: number;

  bottomSpace!: string;

  constructor(private toastService: ToastService) {
   }

  ngOnInit() {
    if(this.tId>0){
    this.bottomSpace = (70 * (this.tId)).toString() + 'px';
    }
    
    setTimeout(()=>{
      this.closeToast();
    },2000)
  }

  

  closeToast(): void {
    const toast = document.getElementById(`toast_${this.tId}`);
    if (this.tId != undefined && toast) {
      toast.classList.add('hidden');
      setTimeout(() => {
        this.toastService.remove(this.tId);
      },300);
    }
  }
}
