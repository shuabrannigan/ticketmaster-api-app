import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';



const MaterialModules = [
    MatToolbarModule
]

@NgModule({
    imports: [CommonModule, MaterialModules],
    exports: [MaterialModules]
})
export class SharedModule {}