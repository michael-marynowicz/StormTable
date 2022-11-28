import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class RepositoryService {
    getFreeId(): string {
        return (Math.random() * 1000).toString();
    }
}
