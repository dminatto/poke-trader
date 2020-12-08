import { Controller, Get, Module, Post, Put, Req, Param, PreconditionFailedException, UseGuards } from '@nestjs/common';
import { CoachService } from '../../domain/terms/terms.service';
import { CoachRepository } from '../../infrastructure/repository/terms.repository';
import { Request } from 'express';
import { ArgsValidatorUtils } from '../../infrastructure/utils/args-validator.utils';

@Module({
  providers: [CoachService],
  imports: [CoachRepository, ArgsValidatorUtils ],

})
@Controller('coach')
export class CoachController {

  constructor(private termsService: TermsService, private validator : ArgsValidatorUtils) {
  }

  @Get(':idApplication/:idAuthentication')
  async getActiveTerm(@Param() params) {
    return this.termsService.getTerms(params.params);
  }

  @Post(':idApplication/:idAuthentication')
  includeTerm(@Param() params, @Req() request: Request): string {
    const {idTerm, typeTerm, titleTerm, bodyTerm, version} = request.body;
    const {idApplication} = params;
    if (this.validator.validate(idTerm)) throw new PreconditionFailedException(idTerm, "idTerm must be sent");
    if (this.validator.validate(typeTerm)) throw new PreconditionFailedException(typeTerm, "typeTerm must be sent");
    if (this.validator.validate(titleTerm)) throw new PreconditionFailedException(titleTerm, "titleTerm must be sent");
    if (this.validator.validate(bodyTerm)) throw new PreconditionFailedException(bodyTerm, "bodyTerm must be sent");
    if (this.validator.validate(version)) throw new PreconditionFailedException(version, "version must be sent");
    if (this.validator.validate(idApplication)) throw new PreconditionFailedException(idApplication, "idApplication must be sent");

    return this.termsService.createTerm(idTerm, typeTerm, titleTerm, bodyTerm, version, idApplication);
  }

}
