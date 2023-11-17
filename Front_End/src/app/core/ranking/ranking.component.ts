import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurgeonService } from '../surgeon.service';
import { surgeonDTO } from '../dto/surgeon.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  surgeons: surgeonDTO[] = [];
  allDataLoaded = false;
  currentPage = 1;
  pageSize = 10;
  searchQuery = '';

  constructor(private surgeonService: SurgeonService) { }

  ngOnInit() {
    this.loadSurgeons();
  }

  loadSurgeons() {
    this.surgeonService.getRankingSurgeons(this.currentPage, this.searchQuery)
      .subscribe(data => {
        if (data.length === 0) {
          this.allDataLoaded = true;
        } else {
          this.surgeons = [...this.surgeons, ...data];
        }
      });
  }

  searchSurgeons() {
    this.surgeons = [];
    this.currentPage = 1;
    this.allDataLoaded = false;
    this.loadSurgeons();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (!this.allDataLoaded) {
      const windowBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
  
      if (windowBottom >= docHeight - 1) {
        this.currentPage++;
        this.loadSurgeons();
      }
    }
  }
  
}
