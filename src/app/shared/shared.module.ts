import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';




const MaterialModules = [
    MatToolbarModule,
    MatButtonModule
]

@NgModule({
    imports: [CommonModule, MaterialModules],
    exports: [MaterialModules]
})
export class SharedModule {}