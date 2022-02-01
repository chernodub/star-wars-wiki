import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

/** Core */
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [FingerprintAIO],
})
export class CoreModule {}
